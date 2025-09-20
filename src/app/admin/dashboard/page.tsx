'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, LogOut, User, UserCheck, BookOpenCheck, Mail, Phone, MapPin, BookHeart, BarChart } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ParticipantDetails {
    _id: string;
    registrationId: string;
    name: string;
    email: string;
    whatsapp: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    registrationType: string;
    checkedIn: boolean;
    followsGita?: 'yes' | 'no';
    gitaSelfRating?: 'low' | 'medium' | 'high';
    createdAt: string;
}

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [participants, setParticipants] = useState<ParticipantDetails[]>([]);
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        notFollowsGita: 0,
        followsGitaCount: 0,
    });
        const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/registerations");
            if (!response.ok) throw new Error("Failed to fetch data");
            const data: ParticipantDetails[] = await response.json();
            setParticipants(data);
            setStats({
                totalRegistrations: data.length,
                notFollowsGita: data.filter(p => p.followsGita === "no").length,
                followsGitaCount: data.filter(p => p.followsGita === 'yes').length,
            });
        } catch (error) {
            toast.error("Failed to load participant data.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'long', timeStyle: 'short'
        }).format(date);
    };

    const exportToCsv = () => {
        const headers = "ID,Name,Email,WhatsApp,Mobile,Address,City,State,FollowsGita,GitaRating,RegisteredOn\n";
        const csvContent = participants.map(p => [
            p.registrationId, p.name, p.email, p.whatsapp, p.mobile,
            `"${p.address.replace(/"/g, '""')}"`, p.city, p.state,
            p.followsGita || 'N/A', p.gitaSelfRating || 'N/A', formatDate(p.createdAt)
        ].join(',')).join('\n');

        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "summit_participants.csv";
        link.click();
        URL.revokeObjectURL(link.href);
    };

        const filteredParticipants = participants.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                    <p className="text-muted-foreground">Manage Summit Participants</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={exportToCsv} className="bg-amber-600 hover:bg-amber-700">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={16} className="mr-2" /> Logout
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Registrations</CardTitle><div className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-100"><User className="h-4 w-4 text-amber-600" /></div></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalRegistrations}</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Non Gita Followers</CardTitle><div className="h-8 w-8 flex items-center justify-center rounded-lg bg-green-100"><UserCheck className="h-4 w-4 text-green-600" /></div></CardHeader><CardContent><div className="text-2xl font-bold">{stats.notFollowsGita}</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Gita Followers</CardTitle><div className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-100"><BookOpenCheck className="h-4 w-4 text-amber-600" /></div></CardHeader><CardContent><div className="text-2xl font-bold">{stats.followsGitaCount}</div></CardContent></Card>
            </div>

            {/* Full Participant Table */}
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Participant List</CardTitle>
                        <Input
                            placeholder="Search by name or email..."
                            className="max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-100">
                                    <TableHead className="w-[25%]">Participant</TableHead>
                                    <TableHead>Contact & Location</TableHead>
                                    <TableHead>Summit Status</TableHead>
                                    <TableHead>Registered On</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={4} className="h-24 text-center">Loading participants...</TableCell></TableRow>
                                ) : filteredParticipants.length > 0 ? (
                                    filteredParticipants.map((p) => (
                                        <TableRow key={p._id}>
                                            <TableCell>
                                                <div className="font-medium text-gray-800">{p.name}</div>
                                                <div className="text-xs text-muted-foreground">{p.registrationId}</div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground space-y-1">
                                                <div className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2" />{p.email}</div>
                                                <div className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2" />{p.whatsapp}</div>
                                                <div className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2" />{`${p.city}, ${p.state}`}</div>
                                            </TableCell>
                                            <TableCell className="space-y-2">
                                                <div className="flex items-center text-xs text-muted-foreground"><BookHeart className="w-3.5 h-3.5 mr-1.5" /> Follows Gita: <span className="font-semibold text-gray-700 ml-1">{p.followsGita === 'yes' ? 'Yes' : 'No'}</span></div>
                                                {p.followsGita === 'yes' && <div className="flex items-center text-xs text-muted-foreground"><BarChart className="w-3.5 h-3.5 mr-1.5" /> Rating: <span className="font-semibold text-gray-700 ml-1 capitalize">{p.gitaSelfRating}</span></div>}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{formatDate(p.createdAt)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={4} className="h-24 text-center">No participants found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export default AdminDashboard;
