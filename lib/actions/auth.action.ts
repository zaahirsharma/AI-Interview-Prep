'use server'

import { db, auth } from '@/firebase/admin';


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

export async function setSessionCookie(idToken: string)  {

}
