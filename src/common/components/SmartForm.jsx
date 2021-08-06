import { useForm } from 'react-hook-form';
import React from 'react';

const Group = ({ children, register }) => {
  return (
    <div className="p-4 mt-1 space-y-4 bg-white rounded-md shadow-sm">
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </div>
  );
};

const SmartForm = ({ defaultValues, children, onSubmit }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form className="flex flex-wrap gap-4" onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name || child.type.name === 'Group'
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

SmartForm.Group = Group;

export default SmartForm;
