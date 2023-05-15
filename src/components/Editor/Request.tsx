import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const Request = () => {
  const { query } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
  };

  return <form onSubmit={handleSubmit}></form>;
};

export default Request;
