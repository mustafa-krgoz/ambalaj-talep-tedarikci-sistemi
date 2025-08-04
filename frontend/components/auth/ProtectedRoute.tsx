import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserFromLocalStorage } from '../../lib/auth';

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = getUserFromLocalStorage();

      if (!user || !allowedRoles.includes(user.role)) {
        await router.push('/login');
      } else {
        setAuthorized(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-blue-800 font-medium">
        Yükleniyor...
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}