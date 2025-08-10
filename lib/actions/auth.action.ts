'use server'

import { db, auth } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams)  {
    const { uid, name, email } = params;

    try {
        // Fetch user record if already exists
        const userRecord = await db.collection('users').doc(uid).get();

        // Check if exists
        if(userRecord.exists) {
            return {
                success: false,
                message: `User already exists, please sign-in instead.`,
            }
        }

        // Create new user
        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: `Account created successfully, please sign-in.`,
        }
    } catch (e: any) {
        console.error('Error creating user', e);

        // Check for firebase specific errors
        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already in use.'
            }
        }

        return {
            success: false,
            message: 'Failed to create an account'
        }
    }
}

export async function signIn(params: SignInParams)  {
    const { email, idToken } = params;

    try {
        // Get access to user
        const userRecord = await auth.getUserByEmail(email);

        // Check if no user record
        if (!userRecord){
            return {
                success: false,
                message: `User does not exist, create an account instead.`
            }
        }

        await setSessionCookie(idToken);

    } catch (e) {
        console.error('Sign in error: ', e);

        return {
            success: false,
            message: 'Failed to login in to account',
        }
    }
}

export async function setSessionCookie(idToken: string)  {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000
    });

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    });

}

export async function getCurrentUser(): Promise<User | null> {
    // Get access to cookie store
    const cookieStore = await cookies();

    // Get specific session cookie
    const sessionCookie = cookieStore.get('session')?.value;

    // No session cookie? User doesn't exist
    if (!sessionCookie) { return null; }

    // If cookie/user exists
    try {
        // Decode session to check if valid user
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        // Get access to user from database
        const userRecord = await db
            .collection('users')
            .doc(decodedClaims.uid)
            .get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ... userRecord.data(),
            id: userRecord.id,
        } as User;

    } catch (e) {
        // Either session invalid or expired
        console.error(e);

        return null;
    }


}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    // Convert object type to boolean returned
    return !!user;
}
