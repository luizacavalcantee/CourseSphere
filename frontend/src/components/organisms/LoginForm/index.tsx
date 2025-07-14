'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { User, EyeOff, Eye } from 'lucide-react';
import { Logo } from '@/assets';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await response.json();
      if (data.length > 0) {
        login(data[0]);
        router.push('/');
      } else {
        setError('Email ou senha inválidos.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="flex items-center justify-center mb-12">
        <Image src={Logo} alt="CourseSphere Logo" width={40} height={40} />
        <span className="ml-3 text-3xl font-bold text-primary">Faça seu login</span>
      </div>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Usuário"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<User size={20} />}
        />
        <div className="relative">
          <FormField
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        <Button type="submit" className="bg-primary">
          Entrar
        </Button>
      </form>
    </div>
  );
};