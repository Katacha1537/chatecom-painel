import { useState } from 'react';

export default function UserForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, plan });
    };

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold">Inserir Novo Usuário</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
                    <input id="email" type="email" className="mt-1 block w-full border border-gray-300 rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="plan" className="block text-sm font-medium">Plano</label>
                    <select id="plan" className="mt-1 block w-full border border-gray-300 rounded p-2" value={plan} onChange={(e) => setPlan(e.target.value)} required>
                        <option value="" disabled>Escolha o Plano</option>
                        <option value="STARTER">Starter</option>
                        <option value="PRO">Pro</option>
                        <option value="UNLIMITED">Unlimited</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Inserir</button>
            </form>
        </section>
    );
}
