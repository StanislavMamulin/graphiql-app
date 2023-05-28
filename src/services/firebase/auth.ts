import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  signOut,
  IdTokenResult,
  Auth,
} from 'firebase/auth';
import { firebaseApp } from './firebase';
import { AuthInstanceError } from '../../errors/AuthInstanceError';

let auth: Auth | undefined;

try {
  auth = getAuth(firebaseApp());
} catch (error) {
  auth = undefined;
}

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    if (!auth) {
      throw AuthInstanceError();
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const getTokenInfo = async (user: User): Promise<IdTokenResult> => {
  try {
    if (!auth) {
      throw AuthInstanceError();
    }

    const tokenResult: IdTokenResult = await user.getIdTokenResult();

    return tokenResult;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (email: string, password: string): Promise<User> => {
  try {
    if (!auth) {
      throw AuthInstanceError();
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    if (!auth) {
      throw AuthInstanceError();
    }

    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
