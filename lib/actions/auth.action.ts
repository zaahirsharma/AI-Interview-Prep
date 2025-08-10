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


