export default function Dashboard({ totalUser, totalChatSessions, totalEcomBots, totalPublicEcomBots }) {
    const userActiv = totalUser.filter(user => user.isSuspended === false)
    const userActivTotal = userActiv.length
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <Card title="Usuários" total={userActivTotal} />
            <Card title="Seções Iniciadas" total={totalChatSessions} />
            <Card title="EcomBots Criados" total={totalEcomBots} />
            <Card title="EcomBots Publicados" total={totalPublicEcomBots} />
        </div>
    );
}

function Card({ title, total }) {
    return (
        <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{title}</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-5xl font-extrabold tracking-tight">{total}</span>
            </div>
        </div>
    );
}
