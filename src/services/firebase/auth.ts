import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
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

export const createUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
