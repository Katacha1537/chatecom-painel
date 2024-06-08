'use client'

import { MdModeEdit } from "react-icons/md"
import { FaTrashCan } from "react-icons/fa6"
import { RiInformationOffFill } from "react-icons/ri"
import { useState } from "react";
import Modal from "./Modal";

export default function UserList({ users, onDelete, onSuspend, onChangePlan, onRegisterUser }) {
    return (
        <section className="mt-8">
            <div className="flex w-full justify-between mb-4">
                <h2 className="text-2xl font-bold text-white mb-4">Usuário(s) Cadastrados</h2>
                <Modal onRegisterUser={onRegisterUser} />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Última Atualização
                            </th>
                            <th scope="col" className="flex justify-center px-6 py-3">
                                Plano
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserTable key={user.id} user={user} onDelete={onDelete} onSuspend={onSuspend} onChangePlan={onChangePlan} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section >
    );
}

function UserCard({ user, onDelete, onSuspend, onChangePlan }) {
    return (
        <div className="flex w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
            <div className="space-y-2 text-white w-full">
                <div className="flex justify-between">
                    <div>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Nome:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Última Atualização:</strong> {user.updatedAt}</p>
                    </div>
                    <div>
                        <div className="flex">
                            <p className="bg-orange-400 px-4 py-2 rounded-md border border-orange-200">{user.plan}</p>
                            <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-3">Excluir</button>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onSuspend(user.id)} className="bg-yellow-500 text-white px-4 py-2 rounded">{user.isSuspended ? 'Ativar' : 'Suspender'}</button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onChangePlan(user.id, e.target.selectedPlan.value);
                }} className="mt-2">
                    <select name="selectedPlan"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Escolha o novo Plano</option>
                        <option value="STARTER">Starter</option>
                        <option value="PRO">Pro</option>
                        <option value="UNLIMITED">Unlimited</option>
                    </select>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                        Atualizar Plano
                    </button>
                </form>
            </div>
        </div>
    );
}

function UserTable({ user, onDelete, onSuspend, onChangePlan }) {
    const [planUser, setPlanUser] = useState(user.plan)
    const [isSuspended, setIsSuspended] = useState(user.isSuspended)

    const onChangeSelectPlan = (userId, newPlan) => {
        setPlanUser(newPlan)
        onChangePlan(userId, newPlan)
    }

    const onChangeIsSuspended = () => {
        setIsSuspended(!isSuspended)
        onSuspend(user.id, isSuspended)
    }

    const onChangeDelete = () => {
        onDelete(user.id)
    }

    return (
        <tr className="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-50 hover:bg-gray-600">
            <th scope="row" className="px-6 py-4" >
                {user.id}
            </th>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white" >
                {user.name}
            </td>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.updatedAt}
            </td>
            <td className="flex justify-center px-6 py-4">
                <select
                    value={planUser}
                    onChange={(e) => onChangeSelectPlan(user.id, e.target.value)}
                    className="bg-[#1659C7] px-4 py-2 rounded-md text-white font-bold focus:outline-none"
                    style={{ cursor: "pointer" }}
                >
                    <option value="STARTER">STARTER</option>
                    <option value="PRO">PRO</option>
                    <option value="UNLIMITED">UNLIMITED</option>
                </select>
            </td>
            <td className={`font-bold ${isSuspended ? 'text-yellow-500' : 'text-green-500'} px-6 py-4`}>
                {isSuspended ? 'SUSPENSO' : 'ATIVO'}
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex">
                    <RiInformationOffFill onClick={onChangeIsSuspended} className="text-yellow-600 hover:cursor-pointer" size={22} />
                    <FaTrashCan onClick={onChangeDelete} className="text-red-600 hover:cursor-pointer ml-3" size={22} />
                </div>
            </td>
        </tr>
    )
}
