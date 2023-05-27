import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  signOut,
  IdTokenResult,
} from 'firebase/auth';
import { firebaseApp } from './firebase';

const auth = getAuth(firebaseApp);

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const getTokenInfo = async (user: User): Promise<IdTokenResult> => {
  try {
    const tokenResult: IdTokenResult = await user.getIdTokenResult();

    return tokenResult;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
