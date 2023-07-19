import Form from '@components/Form';
import Input from '@components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@components/Button';
import usePeer from '@hooks/usePeer';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter your name')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    roomName: yup
      .string()
      .required('Please enter your name')
      .matches(/^[aA-zZ\s0-9]+$/, 'Only number and alphabets are allowed for this field'),
  })
  .required();

const resolver = yupResolver(schema);

type Inputs = {
  name: string;
  roomName: string;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { connect } = usePeer();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver,
  });

  const onSubmit: SubmitHandler<Inputs> = (res) => {
    // console.log(res.name, stringSpacetoDash(res.roomName));
    connect(res.name, res.roomName)
      .then(() => {
        navigate('/room');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Insert Your Name" {...register('name')} error={errors.name} />
        <Input placeholder="Insert Room Name" {...register('roomName')} error={errors.roomName} />
        <Button text="Submit" />
      </Form>
    </div>
  );
};

export default HomePage;
