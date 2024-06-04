import { useState } from "react";

export default function Modal({ onRegisterUser }) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [planUser, setPlanUser] = useState('STARTER')

    const handleRegisterUser = () => {
        if (name == '' || email == '') return alert("preencha as entradas!")
        onRegisterUser(email, name, planUser, setShowModal)
    }

    return (
        <>
            <button
                className="bg-[#1659C7] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Registrar Usuário
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="relative flex flex-col w-full border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                {/*header*/}
                                <div className="flex justify-center p-5 rounded-t">
                                    <h3 className="text-3xl font-semibold text-white">
                                        Registrar Usuário
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="p-6 rounded  w-full max-w-sm">
                                    <div className="mb-4">
                                        <input
                                            id="name"
                                            placeholder='Nome'
                                            type="text"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                            className="w-full px-3 py-2 border-b-2 rounded-lg shadow-sm focus:border-4 focus:border-solid focus:border-l-transparent "
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            id="name"
                                            placeholder='Email'
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            className="w-full px-3 py-2 border-b-2 rounded-lg shadow-sm focus:border-4 focus:border-solid focus:border-l-transparent "
                                            required
                                        />
                                    </div>
                                    <select
                                        value={planUser}
                                        onChange={(e) => { setPlanUser(e.target.value) }}
                                        className="bg-[#1659C7] px-4 py-2 rounded-md text-white font-bold focus:outline-none w-full"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <option value="STARTER">STARTER</option>
                                        <option value="PRO">PRO</option>
                                        <option value="UNLIMITED">UNLIMITED</option>
                                    </select>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        className="bg-[#1659C7] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleRegisterUser()}
                                    >
                                        Registrar Usuário
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
        </>
    );
}