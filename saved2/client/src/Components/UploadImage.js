import { CloudUploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';

const UploadImage = () => {
const props = {
  name: 'pic',
  action: 'http://localhost:5000/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        //console.log(info.file.path)
      message.success(`${info.file.name} file uploaded successfully ${info.file.response} `);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


    return (
        <Upload {...props}>
        <Button>
        <CloudUploadOutlined /> Upload Picture
        </Button>
      </Upload>
    )
}

export default UploadImage
