import { Checkbox } from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { api } from "../../../../Components/axios/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const TABLE_HEAD = ["Name", "Created By", "Size", "Created", "Last Modified", "Actions"];

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
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id],
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
                                    {file?.filename}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {file?.user?.name}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {(file?.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {file?.createdAt}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {file?.updatedAt}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                    Edit
                                </Typography>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}