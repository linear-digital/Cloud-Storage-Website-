import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from "react-redux";
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { setReloadFiles, setReloadUser } from "../../redux/Slice/reloadSlice";
const { Dragger } = Upload;
export function UploadDialog({ open, setOpen }) {
    const dispatch = useDispatch()
    const token = Cookie.get('authToken')
    const { user } = useSelector((state) => state.user)
    const handleOpen = () => setOpen(!open);
    const props = {
        name: 'file',
        action: 'http://localhost:4500/api/file/upload',
        headers: {
            authorization: 'authorization-text',
            userid: user?._id,
            token: token
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // setPercent(0);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                // setPercent(100);
                dispatch(setReloadFiles(info.file))
                dispatch(setReloadUser(info.file))
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,

        },
    };
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Upload Files</DialogHeader>
                <DialogBody >
                    <Dragger {...props} multiple>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}