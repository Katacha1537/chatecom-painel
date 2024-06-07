"use client"
import { useEffect, useMemo } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import UserList from './UserList';
import Footer from './Footer';
import { useRouter } from 'next/navigation';
import useFetchData from '../hooks/useFetchData'; // Importar o hook
import chatEcom from '../pages/api/chatEcom';

export default function Home() {
    const router = useRouter();
    const { loading, users, combinedUserData, totalChatSessions, totalEcomBots, totalPublicEcomBots } = useFetchData();

    useEffect(() => {
        const sessionOn = sessionStorage.getItem('sessionVALUE');
        const correctToken = process.env.NEXT_PUBLIC_PASSWORD;

        if (sessionOn !== correctToken) {
            router.push('/login');
        }
    }, [router]);

    const handleDeleteUser = async (userId) => {
        try {
            const urlUser = `/User?id=eq.${encodeURIComponent(userId)}`;
            const responseUser = await chatEcom.delete(urlUser);
            console.log('User deleted successfully:', responseUser.data);

            const urlWorkspace = `/Workspace?id=eq.${encodeURIComponent(userId)}`;
            const responseWorkspace = await chatEcom.delete(urlWorkspace);
            console.log('Workspace deleted successfully:', responseWorkspace.data);

            const urlMemberInWorkspace = `/MemberInWorkspace?workspaceId=eq.${encodeURIComponent(userId)}`;
            const responseMemberInWorkspace = await chatEcom.delete(urlMemberInWorkspace);
            console.log('MemberInWorkspace deleted successfully:', responseMemberInWorkspace.data);

            const restartUsers = users.filter(user => user.id !== userId)
            setUsers(restartUsers)
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    };

    const handleSubmitRegisterUser = async (email, name, plan, onClose) => {
        try {
            const urlUser = `/User`;

            const dataUser = {
                id: email,
                name: name,
                email: email,
                onboardingCategories: []
            };

            const responseUser = await chatEcom.post(urlUser, dataUser);
            console.log('User Create successfully:', responseUser.data)
            const urlWorkspace = `/Workspace`;

            const dataWorkspace = {
                id: email,
                name: "My Workspace",
                icon: null,
                plan: plan,
                stripeId: null,
                additionalChatsIndex: 0,
                additionalStorageIndex: 0,
                chatsLimitFirstEmailSentAt: null,
                chatsLimitSecondEmailSentAt: null,
                storageLimitFirstEmailSentAt: null,
                storageLimitSecondEmailSentAt: null,
                customChatsLimit: null,
                customSeatsLimit: null,
                customStorageLimit: null,
                isQuarantined: false,
                isSuspended: false,
                isPastDue: false,
                isVerified: null
            };

            const responseWorkspace = await chatEcom.post(urlWorkspace, dataWorkspace)
            console.log('Workspace Create successfully:', responseWorkspace.data)
            const urlMemberInWorkspace = `/MemberInWorkspace`;

            const dataMemberInWorkspace = {
                userId: email,
                workspaceId: email,
                role: "ADMIN"
            };

            const responseMemberInWorkspace = await chatEcom.post(urlMemberInWorkspace, dataMemberInWorkspace)
            console.log('MemberInWorkspace Create successfully:', responseMemberInWorkspace.data)

            const newUser = {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                id_workspace: dataWorkspace.id,
                name_workspace: dataWorkspace.name,
                plan: dataWorkspace.plan,
                updatedAt: formattedDate(new Date()),
                isSuspended: dataWorkspace.isSuspended
            }

            setUsers(prevUsers => [...prevUsers, newUser])

            onClose(false)
        } catch (error) {
            console.error('Error Create:', error);
        }
    }

    const handleSuspendUser = async (userId, isSuspend) => {
        console.log(isSuspend)
        try {
            const url = `/Workspace?id=eq.${encodeURIComponent(userId)}`;

            const data = {
                isSuspended: !isSuspend
            };

            const response = await chatEcom.patch(url, data);

            console.log('isSuspended updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating isSuspended:', error);
        }
    };

    const handleChangePlan = async (userId, newPlan) => {

        try {
            const url = `/Workspace?id=eq.${encodeURIComponent(userId)}`;

            const data = {
                plan: newPlan
            };

            const response = await chatEcom.patch(url, data);

            console.log('Plan updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-xl">Carregando...</div>
            </div>
        );
    }

    return (
        <div className='h-full bg-gray-900'>
            <Header />
            <main className="container mx-auto p-4">
                <Dashboard totalUser={combinedUserData} totalChatSessions={totalChatSessions} totalEcomBots={totalEcomBots} totalPublicEcomBots={totalPublicEcomBots} />
                <UserList users={combinedUserData} onDelete={handleDeleteUser} onSuspend={handleSuspendUser} onChangePlan={handleChangePlan} onRegisterUser={handleSubmitRegisterUser} />
            </main>
            <Footer />
        </div>
    );
}
