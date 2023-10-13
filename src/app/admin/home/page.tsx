'use client';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import React, { useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState({
    approved: 0,
    rejected: 0,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;

        const condominiumId = JSON.parse(
          localStorage.getItem('condominium') || '',
        )._id;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project/condominium/${condominiumId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();
        const projectsApproved = responseData.filter(
          (e: any) => e.assemblyApproval,
        ).length;
        const projectsRejected = responseData.filter(
          (e: any) => !e.assemblyApproval,
        ).length;
        const totalProjects = responseData.length;

        const approvedPercentage =
          (projectsApproved / totalProjects) * 100;
        const rejectedPercentage =
          (projectsRejected / totalProjects) * 100;

        setProjects({
          approved: Number(approvedPercentage.toFixed(1)),
          rejected: Number(rejectedPercentage.toFixed(1)),
        });
      } catch (error) {
        console.error('Error:', error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    fetchData();
  }, []);
  return (
    <main className="flex pt-20 pl-5">
      <Card className="mr-4 w-[20vw]">
        <CardHeader>
          <CardTitle>Projetos APROVADOS</CardTitle>
          <CardDescription>
            Porcentagem de projetos aprovados pela
            assembléia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl">{projects.approved}%</p>
          <Progress value={projects.approved} />
        </CardContent>
      </Card>
      <Card className="mr-4 w-[20vw]">
        <CardHeader>
          <CardTitle>Projetos NÃO APROVADOS</CardTitle>
          <CardDescription>
            Porcentagem de projetos que NÃO foram aprovados
            pela assembléia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl">{projects.rejected}%</p>
          <Progress value={projects.rejected} />
        </CardContent>
      </Card>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
