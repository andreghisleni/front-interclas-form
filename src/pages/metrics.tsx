import React from "react";

import Head from "next/head";

import { GetStaticProps } from "next";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Color } from "../styles/pages/subscribe";
import { api } from "../services/api";
import { Card, CardsContainer } from "../styles/pages/metrics";

interface IMembers {
  id: string;
  name: string;
  arrive_for_lunch: boolean;
  sex: string;
  member_type: {
    id: string;
    name: string;
    label: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  inscription: {
    id: string;
    cla_name: string;
    scout_group: {
      name: string;
      number: string;
      city: string;
      state: string;
      district_name: string;
    };
  };
}

export interface IMetrics {
  inscriptions: number;
  members: {
    total: number;
    types: {
      senior: number;
      motorista: number;
      mestre: number;
      pioneiro: number;
    };
  };
}

const Metrics: React.FC<{
  metrics: IMetrics;
  members: IMembers[];
}> = ({ metrics, members }) => {
  return (
    <>
      <Head>
        <title>Métricas formulário | Interclãs Form</title>
      </Head>

      <main>
        <section className="callaction">
          <div className="container">
            <div className="row">
              <h1>
                <Color>Métricas das inscrições</Color>
              </h1>
            </div>
            <CardsContainer>
              <Card>
                <div>
                  <header>Total De Clãs inscritos</header>
                  <h2>{metrics.inscriptions}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Membros Inscritos</header>
                  <h2>{metrics.members.total}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Pioneiros Inscritos</header>
                  <h2>{metrics.members.types.pioneiro}</h2>
                </div>
              </Card>

              <Card>
                <div>
                  <header>Total De Seniores Inscritos</header>
                  <h2>{metrics.members.types.senior}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Mestres Inscritos</header>
                  <h2>{metrics.members.types.mestre}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Motoristas Inscritos</header>
                  <h2>{metrics.members.types.motorista}</h2>
                </div>
              </Card>
            </CardsContainer>

            <div className="row">
              <h1>
                <Color>Membros Inscritos</Color>
              </h1>
            </div>
            <div className="row bg-white p-4 shadow-md rounded-md">
              <Table>
                <TableCaption>Membros Inscritos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Nome</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nome Do Clã</TableHead>
                    <TableHead>Grupo</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Distrito</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.sex}</TableCell>
                      <TableCell>{member.member_type.label}</TableCell>
                      <TableCell>{member.inscription.cla_name}</TableCell>
                      <TableCell>
                        {member.inscription.scout_group.name} -{" "}
                        {member.inscription.scout_group.number}/
                        {member.inscription.scout_group.state}
                      </TableCell>
                      <TableCell>
                        {member.inscription.scout_group.city}
                      </TableCell>
                      <TableCell>
                        {member.inscription.scout_group.district_name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* <div className="row">
              <pre>{JSON.stringify(members, null, 2)}</pre>
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const getMetrics = await api.get("/inscriptions/count");
  const getMembers = await api.get("/inscriptions/members");

  return {
    props: {
      metrics: getMetrics.data,
      members: getMembers.data,
    },
    revalidate: 15,
  };
};

export default Metrics;
