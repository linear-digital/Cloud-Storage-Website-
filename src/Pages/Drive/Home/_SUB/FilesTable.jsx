import { Checkbox } from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { api } from "../../../../Components/axios/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const TABLE_HEAD = ["Name", "Created By", "Size", "Created", "Last Modified", "Actions"];
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { filesize } from "../../../../helper/fileSize";
import { toast } from "react-hot-toast";
const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
    },
    {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
    },
    {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
    },
];

export function FilesTable() {
    const [selected, setSelected] = useState([]);
    const { user } = useSelector((state) => state.user)
    const { reloadFiles } = useSelector((state) => state.reload)
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id, reloadFiles],
        queryFn: async () => {
            const { data } = await api.get(`/file/user/${user?._id}`);
            return data;
        },
    });

    const selectAll = () => {
        if (selected.length === TABLE_ROWS.length) {
            setSelected([]);
        } else {
            setSelected(TABLE_ROWS);
        }
    }
    const selectOne = (index) => {
        if (selected.filter((item) => item === index).length > 0) {

        } else {
            setSelected([...selected, index]);
        }
    }
    const deleteFile = async (id) => {
        try {
            await api.delete(`/file/${id}`)
            toast.success("File deleted successfully")
            refetch()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    if (isLoading) {
        return <div>Loading</div>
    }
    return (
        <Card className="h-auto w-full  mt-10 bg-white">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        <th className="border-b border-blue-gray-100 bg-white p-4">
                            <Checkbox checked={selected.length === TABLE_ROWS.length} onChange={selectAll} />
                        </th>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-white p-4">
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
                    {files.map((file, index) => (
                        <tr key={file?._id} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Checkbox />
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {file?.originalname}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {file?.user?.name}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {
                                        filesize(file?.size)
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {
                                        moment(file?.createdAt).format("MMM Do YY")
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {
                                        moment(file?.updatedAt).format("MMM Do YY")
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center">
                                    <button className="btn btn-link text-primary">
                                        <FontAwesomeIcon icon={faLink} width={20} />
                                    </button>
                                    <div className="dropdown dropdown-end">
                                        <button tabIndex={0} role="button">
                                            <FontAwesomeIcon icon={faEllipsisV} width={20} />
                                        </button>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <button className="text-primary">Edit</button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => deleteFile(file?._id)}
                                                    className="text-error">Delete</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}