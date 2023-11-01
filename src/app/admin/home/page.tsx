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
  const [projectsAprovation, setProjectsAprovation] =
    useState({
      approved: 0,
      rejected: 0,
    });

  const [projects, setProjects] = useState<any>([]);

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
        setProjects(responseData);
        console.log(responseData);
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

        setProjectsAprovation({
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
    <main className="pt-20 pl-5">
      <h1 className="mb-4 text-2xl">
        Relatório de aprovação dos projetos
      </h1>
      <div className="flex">
        <Card className="mr-4 w-[20vw]">
          <CardHeader>
            <CardTitle>Projetos APROVADOS</CardTitle>
            <CardDescription>
              Porcentagem de projetos aprovados pela
              assembléia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              {projectsAprovation.approved}%
            </p>
            <Progress value={projectsAprovation.approved} />
          </CardContent>
        </Card>
        <Card className="mr-4 w-[20vw]">
          <CardHeader>
            <CardTitle>Projetos NÃO APROVADOS</CardTitle>
            <CardDescription>
              Porcentagem de projetos que NÃO foram
              aprovados pela assembléia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              {projectsAprovation.rejected}%
            </p>
            <Progress value={projectsAprovation.rejected} />
          </CardContent>
        </Card>
      </div>
      <h1 className="mt-4 text-2xl">
        Relatório de despesas por projeto
      </h1>
      <div className="mt-4">
        {projects.map((project: any) => (
          <Card
            className="mt-4 mr-4 w-[41vw]"
            key={project._id}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                {`Budget do projeto: R$${
                  project.budget
                } - Total de gastos até o momento: R$${project.expenses.reduce(
                  (sum: any, e: any) => (sum += e.cost),
                  0,
                )}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl">
                {Number(
                  (
                    (project.expenses.reduce(
                      (sum: any, e: any) => (sum += e.cost),
                      0,
                    ) /
                      project.budget) *
                    100
                  ).toFixed(1),
                )}
                %
              </p>
              <Progress
                value={Number(
                  (
                    (project.expenses.reduce(
                      (sum: any, e: any) => (sum += e.cost),
                      0,
                    ) /
                      project.budget) *
                    100
                  ).toFixed(1),
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}
