import React from 'react';
import CustomButton from './CustomButton';

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex text-center rounded-none max-w-[260px]">
      <CustomButton variant="secondary">Trở về</CustomButton>
      <CustomButton variant="primary">Xác nhận</CustomButton>
    </div>
  );
};

export default ButtonGroup;