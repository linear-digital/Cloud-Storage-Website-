import { Card, Typography } from "@material-tailwind/react";
import { CheckBox } from "@mui/icons-material";
import UserCard from "./UserCard";
import { Chip } from "@material-tailwind/react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import UpdateDialog from "../../../Components/Dialog/UpdateDialog";

const TABLE_HEAD = ["User", "Role", "Created", "Actions"];


export default function UserTable({ users, refetch }) {
    const [selected, setSelected] = useState([]);
    const selecOne = (user) => {
        if (selected?.filter((item) => item?._id === user?._id).length > 0) {
            setSelected(selected?.filter((item) => item?._id !== user?._id));
        }
        else {
            setSelected([...selected, user]);
        }
    }
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)
    return (
        <Card className="max-h-screen w-full overflow-scroll">
            <UpdateDialog open={open} setOpen={setOpen} user={user}
            refetch={refetch}
            />
            <table className="w-full min-w-max table-auto text-left">
                <thead>

                    <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Checkbox
                                onChange={() => {
                                    if (selected?.length === users?.length) {
                                        setSelected([]);
                                    } else {
                                        setSelected(users);
                                    }
                                }}
                                checked={selected?.length === users?.length}
                            />
                        </th>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Checkbox
                                    onChange={() => selecOne(user)}
                                    checked={selected?.filter((item) => item?._id === user?._id).length > 0}
                                />
                            </td>
                            <td>
                                <UserCard user={user} />
                            </td>
                            <td className="p-4">
                                <Chip
                                    value={user?.role}
                                    color="orange"
                                    size="sm"
                                    className="w-[100px]"
                                />
                            </td>
                            <td className="p-4">
                                <h1
                                    className="text-sm"
                                >{moment(user?.createdAt).format("MMMM Do YYYY")}</h1>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-5">
                                    <button 
                                    onClick={() => {
                                        setOpen(true)
                                        setUser(user)
                                    }}
                                    className="hover:text-primary">
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>

                                    <button className="hover:text-red-500">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}