import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Button } from 'antd';
import { useSelector } from "react-redux";
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { Input } from "@material-tailwind/react";
import { api } from "../axios/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { setReloaFolder } from "../../redux/Slice/reloadSlice";

export function CreateFolder({ open, setOpen }) {
    const { user } = useSelector((state) => state.user)
    const handleOpen = () => setOpen(!open);
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const createFolder = async () => {
        if (!name) {
            setError("Folder name is required")
            return
        }
        try {
            const res = await api.post('/folder/create', {
                name: name,
                parent: 'root',
                user: user?._id
            })
            setOpen(false)
            dispatch(setReloaFolder(res.data))
            toast.success("Folder created successfully")
            setError("")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setError(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Create a new folder</DialogHeader>
                <DialogBody >
                    <p className="text-red-500 text-sm mb-5">
                        {error}
                    </p>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="md" label="Folder Name" />
                    <button
                        onClick={createFolder}
                        className="btn btn-primary btn-sm mt-5">
                        Create Folder
                    </button>
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