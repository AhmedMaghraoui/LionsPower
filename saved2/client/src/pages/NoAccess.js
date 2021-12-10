import React, {useState} from 'react'
import { Result, Button, Modal } from 'antd';
import SignInOrSignUp from '../Components/SignInOrSignUp';



const NoAccess = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (
        <>
        <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button onClick={showModal} type="primary">Sign In</Button>}
  />
  <Modal title="Sign in" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <SignInOrSignUp/>
            </Modal>
  </>
    )
}

export default NoAccess
