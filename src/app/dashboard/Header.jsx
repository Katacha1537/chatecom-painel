import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('sessionVALUE');
        router.push('/login');
    };

    return (
        <header className="flex w-full justify-between items-center p-4 px-12 text-white ">
            <img src="https://i.postimg.cc/G2W8QjXp/Horizontal-White.png" alt="Logo" className="h-12" />
            <button
                className="bg-red-500 px-8 py-2 rounded"
                onClick={handleLogout}
            >
                Sair
            </button>
        </header>
    );
}
