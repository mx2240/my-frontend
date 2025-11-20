import axios from "axios";
import toast from "react-hot-toast";

const handleDelete = async (id) => {
    try {
        await axios.delete(`/api/admin/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Student deleted");
        setConfirm({ open: false, id: null });
        if (students.length === 1 && page > 1) setPage(page - 1);
        else fetchStudents();
    } catch (err) {
        toast.error(err?.response?.data?.message || "Delete failed");
    }


    // inside StudentsList component, near top controls
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleBulkUpload = async () => {
        if (!file) return toast.error("Choose a CSV file first");
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/api/admin/students/bulk-upload", formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            toast.success(res.data.message || "Upload complete");
            setFile(null);
            fetchStudents();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };





};


export default function StudentsList() {
    return <div>StudentsList</div>;
}