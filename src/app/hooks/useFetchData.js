import { useState, useEffect, useMemo } from 'react';
import chatEcom from '../pages/api/chatEcom';

const useFetchData = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [memberInWorkspace, setMemberInWorkspace] = useState([]);
    const [totalChatSessions, setTotalChatSessions] = useState(0);
    const [totalEcomBots, setTotalEcomBots] = useState(0);
    const [totalPublicEcomBots, setTotalPublicEcomBots] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, workspacesResponse, memberInWorkspaceResponse, chatSessionsResponse, typebotResponse, publicTypebotResponse] = await Promise.all([
                    chatEcom.get('/User'),
                    chatEcom.get('/Workspace'),
                    chatEcom.get('/MemberInWorkspace'),
                    chatEcom.get('/ChatSession'),
                    chatEcom.get('/Typebot'),
                    chatEcom.get('/PublicTypebot')
                ]);

                setUsers(usersResponse.data);
                setWorkspaces(workspacesResponse.data);
                setMemberInWorkspace(memberInWorkspaceResponse.data);
                setTotalChatSessions(chatSessionsResponse.data.length);
                setTotalEcomBots(typebotResponse.data.length);
                setTotalPublicEcomBots(publicTypebotResponse.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const combinedUserData = useMemo(() => {
        const workspaceMap = {};
        workspaces.forEach(workspace => {
            workspaceMap[workspace.id] = workspace;
        });

        const playground = users.map(user => {
            const memberData = memberInWorkspace.find(member => member.userId === user.id);
            if (!memberData) {
                console.error(`No workspace found for user ${user.id}`);
                return null;
            }

            const workspace = workspaceMap[memberData.workspaceId];
            if (!workspace) {
                console.error(`Workspace not found for user ${user.id}`);
                return null;
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                id_workspace: workspace.id,
                name_workspace: workspace.name,
                plan: workspace.plan,
                updatedAt: formattedDate(user.updatedAt),
                isSuspended: workspace.isSuspended
            };
        }).filter(user => user !== null);
        return playground;
    }, [workspaces, memberInWorkspace]);

    return { loading, setUsers, setWorkspaces, setMemberInWorkspace, combinedUserData, users, workspaces, memberInWorkspace, totalChatSessions, totalEcomBots, totalPublicEcomBots };
};

export default useFetchData;
