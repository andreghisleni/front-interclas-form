import React, { useCallback, useRef, useState } from "react";

import Head from "next/head";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import * as Yup from "yup";

import { FormHandles, SubmitHandler } from "@unform/core";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { Input, InputMask, InputSelect } from "../../components/Inputs";

import { getValidationErrors } from "../../utils/getValidationErrors";
import { Color } from "../../styles/pages/subscribe";

interface SubscribeFormData {
  section_id: string;
  schooling_id: string;

  name: string;
  email: string;
  birthday: string;
  country: string;
  state: string;
  formation: string;
  work: string;
  been_planetarium: boolean;
  planetariums: string;
  comments: string;
}
const Subscribe: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [numMembers, setNumMembers] = useState<number[]>([]);
  const [numStaffs, setNumStaffs] = useState<number[]>([]);
  const [numDrivers, setNumDrivers] = useState<number[]>([]);

  const handleSubmit: SubmitHandler<SubscribeFormData> = useCallback(
    async (data): Promise<void> => {
      console.log(data);
      try {
        const schema = Yup.object().shape({
          section_id: Yup.string().required("O Turno é obrigatório"),
          schooling_id: Yup.string().required("Escolaridade é obrigatório"),
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido (example@domin.com.br)"),
          birthday: Yup.string().required("Data de nascimento obrigatória"),
          country: Yup.string().required("Cidade é obrigatório"),
          state: Yup.string().required("Estado é obrigatório"),
          formation: Yup.string().required("Formação é obrigatório"),
          work: Yup.string().required("Trabalho é obrigatório"),
          been_planetarium: Yup.boolean().required("Campo obrigatório"),
          planetariums: Yup.string(),
          comments: Yup.string(),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        const parts = data.birthday.split("/");

        const formData = {
          ...data,
          planetariums: data.planetariums || "",
          birthday: new Date(`${parts[2]}-${parts[1]}-${Number(parts[0]) + 1}`),
        };

        setLoading(true);
        await api.post("/enrolled", formData);

        formRef.current?.reset();
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else if (err instanceof AxiosError) {
          if (
            err.response?.data.message ===
            "This Email address already subscribed."
          )
            toast("Erro na inscrição, e-mail já utilizado", {
              type: "error",
            });
          if (err.response?.data.message === "Section not limit.")
            toast(
              "Erro, evento lotado na sessão selecionada, Não tem mais vagas nessa sessão.",
              {
                type: "error",
              }
            );
        } else {
          // console.log(err);
          toast("Erro na inscrição, tente novamente mais tarde", {
            type: "error",
          });
        }

        setLoading(false);
      }
    },
    [setLoading, setSuccess]
  );

  const handleClickSetMembers = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_j");

    if (!n) setNumMembers([]);

    if (n > 0) {
      setNumMembers([]);
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i);
      }
      setNumMembers(arr);
    }
  }, []);
  const handleClickSetStaffs = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_s");

    if (!n) setNumStaffs([]);

    if (n > 0) {
      setNumStaffs([]);
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i);
      }
      setNumStaffs(arr);
    }
  }, []);

  const handleClickSetDrivers = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_d");

    if (!n) setNumDrivers([]);

    if (n > 0) {
      setNumDrivers([]);
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i);
      }
      setNumDrivers(arr);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Planetario - Inscrições</title>
      </Head>

      {success && (
        <main>
          <section className="callaction" style={{ marginBottom: 392 }}>
            <div className="container">
              <div className="row">
                <h1>
                  <Color>Inscrição realizada com sucesso</Color>
                </h1>
              </div>
            </div>
          </section>
        </main>
      )}

      {!success && (
        <main>
          <section className="callaction">
            <div className="container">
              <div className="row">
                <h1>
                  <Color>Formulário de inscrição para o interclas</Color>
                </h1>
              </div>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="cla_name"
                    dark={false}
                    label="Nome do Clã"
                    placeholder="Nome"
                    required
                  />
                  <Scope path="scout_group">
                    <Input
                      name="name"
                      dark={false}
                      label="Nome do Grupo Escoteiro"
                      placeholder="Nome"
                      required
                    />
                    <Input
                      name="number"
                      dark={false}
                      label="Numeral do Grupo Escoteiro"
                      placeholder="000"
                      required
                    />
                  </Scope>
                </div>

                <div className="row">
                  <Scope path="scout_group">
                    <Input
                      name="city"
                      dark={false}
                      label="Cidade do Grupo Escoteiro"
                      placeholder="Cidade"
                      required
                    />
                    <InputMask
                      name="state"
                      dark={false}
                      label="Estado do Grupo Escoteiro"
                      placeholder="UF"
                      mask="aa"
                      required
                    />
                    <Input
                      name="district_name"
                      dark={false}
                      label="Nome do Distrito do Grupo Escoteiro"
                      placeholder="Distrito"
                      required
                    />
                  </Scope>
                </div>

                <Scope path="payment">
                  <h2
                    style={{
                      marginTop: 20,
                      left: 0,
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Color>Dados bancarios para reembolsos:</Color>
                  </h2>
                  <div className="row">
                    <Input
                      name="pix_key"
                      dark={false}
                      label="Chave PIX"
                      placeholder="pix"
                      required
                    />
                    <Input
                      name="bank"
                      dark={false}
                      label="Nome do Distrito do Grupo Escoteiro"
                      placeholder="Distrito"
                      required
                    />
                    <Input
                      name="agency"
                      dark={false}
                      label="Nome do Distrito do Grupo Escoteiro"
                      placeholder="Distrito"
                      required
                    />
                    <Input
                      name="account"
                      dark={false}
                      label="Nome do Distrito do Grupo Escoteiro"
                      placeholder="Distrito"
                      required
                    />
                  </div>
                  <Scope path="holder">
                    <div className="row">
                      <Input
                        name="name"
                        dark={false}
                        label="Nome do titular da conta"
                        placeholder="Name"
                        required
                      />
                      <InputMask
                        name="document"
                        dark={false}
                        label="CPF/CNPJ do titular da conta"
                        type="cpf/cnpj"
                        placeholder="000.000.000-000 ou 000.000.000/0001-000"
                        mask="999.999.999-999"
                        maskPlaceholder=""
                        required
                      />
                    </div>
                  </Scope>
                </Scope>
                <Scope path="responsable">
                  <h2
                    style={{
                      marginTop: 20,
                      left: 0,
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Color>Dados do responsável do clã:</Color>
                  </h2>
                  <div className="row">
                    <Input
                      name="name"
                      dark={false}
                      label="Nome do responsável"
                      placeholder="Nome"
                      required
                    />
                    <Input
                      name="email"
                      dark={false}
                      label="E-mail do responsável"
                      placeholder="E-mail"
                      type="email"
                      required
                    />
                    <InputMask
                      name="phone"
                      dark={false}
                      label="Telefone do responsável"
                      placeholder="Telefone"
                      mask="(99) 9 9999-9999"
                      maskChar=""
                      required
                    />
                  </div>
                </Scope>

                <h2
                  style={{
                    marginTop: 20,
                    left: 0,
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Color>PIONEIROS OU SENIORES (MÍNIMO 17 ANOS E MEIO)</Color>
                </h2>
                <h2>
                  <Color>INVESTIMENTO: R$ 100,00</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_j"
                    dark={false}
                    label="Número de jovens (pioneiros e seniors)"
                    type="number"
                    placeholder="0"
                    min={1}
                    required
                  />
                  <Button
                    style={{
                      marginTop: 23,
                    }}
                    onClick={handleClickSetMembers}
                  >
                    Carregar Tabela
                  </Button>
                </div>

                <div className="row" style={{ marginTop: 20 }}>
                  <Scope path="members">
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Sexo</th>
                          <th>Registro UEB</th>
                          <th>Pioneiro ou Sênior</th>
                          <th>Restrições alimentares</th>
                          <th>Restrições físicas</th>
                          <th>Vai chegar no sábado de manhã?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {numMembers.map((i) => (
                          <Scope path={String(i)}>
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  required
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="sex"
                                  dark={false}
                                  placeholder="Sexo"
                                  options={[
                                    { value: "M", label: "Masculino" },
                                    { value: "F", label: "Feminino" },
                                  ]}
                                  required
                                />
                              </td>
                              <td>
                                <InputMask
                                  name="register"
                                  dark={false}
                                  placeholder="Registro"
                                  mask="999999-9"
                                  maskChar=""
                                  style={{ width: 100 }}
                                  required
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="type"
                                  dark={false}
                                  placeholder="Pioneiro ou Sênior"
                                  options={[
                                    { value: "pioneiro", label: "Pioneiro" },
                                    { value: "senior", label: "Sênior" },
                                  ]}
                                  defaultValue={{
                                    value: "pioneiro",
                                    label: "Pioneiro",
                                  }}
                                  required
                                />
                              </td>
                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    required
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    required
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  required
                                />
                              </td>
                            </tr>
                          </Scope>
                        ))}
                        {numMembers.length === 0 && (
                          <Scope path="a">
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  disabled
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="sex"
                                  dark={false}
                                  placeholder="Sexo"
                                  options={[
                                    { value: "M", label: "Masculino" },
                                    { value: "F", label: "Feminino" },
                                  ]}
                                  isDisabled
                                />
                              </td>
                              <td>
                                <InputMask
                                  name="register"
                                  dark={false}
                                  placeholder="Registro"
                                  mask="999999-9"
                                  maskChar=""
                                  style={{ width: 100 }}
                                  disabled
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="type"
                                  dark={false}
                                  placeholder="Pioneiro ou Sênior"
                                  options={[
                                    { value: "pioneiro", label: "Pioneiro" },
                                    { value: "senior", label: "Sênior" },
                                  ]}
                                  defaultValue={{
                                    value: "pioneiro",
                                    label: "Pioneiro",
                                  }}
                                  isDisabled
                                />
                              </td>
                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    disabled
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  disabled
                                />
                              </td>
                            </tr>
                          </Scope>
                        )}
                      </tbody>
                    </table>
                  </Scope>
                </div>
                <h2
                  style={{
                    marginTop: 20,
                    left: 0,
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Color>MESTRES / ASSISTENTES / DIRETORES</Color>
                </h2>
                <h2>
                  <Color>INVESTIMENTO: R$ 100,00</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_s"
                    dark={false}
                    label="Número de jovens (pioneiros e seniors)"
                    type="number"
                    placeholder="0"
                    min={1}
                    required
                  />
                  <Button
                    style={{
                      marginTop: 23,
                    }}
                    onClick={handleClickSetStaffs}
                  >
                    Carregar Tabela
                  </Button>
                </div>

                <div className="row" style={{ marginTop: 20 }}>
                  <Scope path="staff">
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Sexo</th>
                          <th>Registro UEB</th>

                          <th>Função*</th>
                          <th>Pode auxiliar em...*</th>

                          <th>Restrições alimentares</th>
                          <th>Restrições físicas</th>
                          <th>Vai chegar no sábado de manhã?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {numStaffs.map((i) => (
                          <Scope path={String(i)}>
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  required
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="sex"
                                  dark={false}
                                  placeholder="Sexo"
                                  options={[
                                    { value: "M", label: "Masculino" },
                                    { value: "F", label: "Feminino" },
                                  ]}
                                  required
                                />
                              </td>
                              <td>
                                <InputMask
                                  name="register"
                                  dark={false}
                                  placeholder="Registro"
                                  mask="999999-9"
                                  maskChar=""
                                  style={{ width: 100 }}
                                  required
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="function"
                                  dark={false}
                                  placeholder="Função"
                                  options={[
                                    "Mestre(a)",
                                    "Assistente",
                                    "Diretor(a)",
                                    "Escotista",
                                  ].map((j) => ({
                                    value: j.toLowerCase(),
                                    label: j,
                                  }))}
                                  required
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="can_assist_in"
                                  dark={false}
                                  placeholder="em..."
                                  options={[
                                    "Segurança",
                                    "Limpeza",
                                    "Enfermaria",
                                    "Fotografia",
                                    "Outros",
                                  ].map((j) => ({
                                    value: j.toLowerCase(),
                                    label: j,
                                  }))}
                                  required
                                />
                              </td>
                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    required
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    required
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  required
                                />
                              </td>
                            </tr>
                          </Scope>
                        ))}
                        {numStaffs.length === 0 && (
                          <Scope path="a">
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  disabled
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="sex"
                                  dark={false}
                                  placeholder="Sexo"
                                  options={[
                                    { value: "M", label: "Masculino" },
                                    { value: "F", label: "Feminino" },
                                  ]}
                                  isDisabled
                                />
                              </td>
                              <td>
                                <InputMask
                                  name="register"
                                  dark={false}
                                  placeholder="Registro"
                                  mask="999999-9"
                                  maskChar=""
                                  style={{ width: 100 }}
                                  disabled
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="function"
                                  dark={false}
                                  placeholder="Função"
                                  options={[
                                    "Mestre(a)",
                                    "Assistente",
                                    "Diretor(a)",
                                    "Escotista",
                                  ].map((j) => ({
                                    value: j,
                                    label: j,
                                  }))}
                                  isDisabled
                                />
                              </td>
                              <td>
                                <InputSelect
                                  name="can_assist_in"
                                  dark={false}
                                  placeholder="em..."
                                  options={[
                                    "Segurança",
                                    "Limpeza",
                                    "Enfermaria",
                                    "Fotografia",
                                    "Outros",
                                  ].map((j) => ({
                                    value: j,
                                    label: j,
                                  }))}
                                  isDisabled
                                />
                              </td>
                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    disabled
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  disabled
                                />
                              </td>
                            </tr>
                          </Scope>
                        )}
                      </tbody>
                    </table>
                  </Scope>
                </div>
                <div className="row">
                  <h2>
                    Precisaremos de voluntários adultos para auxiliar durante a
                    atividade em algumas tarefas como FOTOGRAFIA, SEGURANÇA ou
                    ENFERMARIA. Favor informar acima no campo (pode auxiliar
                    em...).
                  </h2>
                </div>

                <h2
                  style={{
                    marginTop: 20,
                    left: 0,
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Color>MOTORISTAS</Color>
                </h2>
                <h2>
                  <Color>DESPESA: R$ 85,00 - Somente Alimentação</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_d"
                    dark={false}
                    label="Número de motoristas"
                    type="number"
                    placeholder="0"
                    min={1}
                    required
                  />
                  <Button
                    style={{
                      marginTop: 23,
                    }}
                    onClick={handleClickSetDrivers}
                  >
                    Carregar Tabela
                  </Button>
                </div>

                <div className="row" style={{ marginTop: 20 }}>
                  <Scope path="drivers">
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>

                          <th>Restrições alimentares</th>
                          <th>Restrições físicas</th>
                          <th>Vai chegar no sábado de manhã?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {numDrivers.map((i) => (
                          <Scope path={String(i)}>
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  required
                                />
                              </td>

                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    required
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    required
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  required
                                />
                              </td>
                            </tr>
                          </Scope>
                        ))}
                        {numDrivers.length === 0 && (
                          <Scope path="a">
                            <tr>
                              <td>
                                <Input
                                  name="name"
                                  dark={false}
                                  placeholder="Nome"
                                  disabled
                                />
                              </td>

                              <Scope path="restrictions">
                                <td>
                                  <Input
                                    name="alimentation"
                                    dark={false}
                                    placeholder="Restrições alimentares"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="health"
                                    dark={false}
                                    placeholder="Restrições físicas"
                                    disabled
                                  />
                                </td>
                              </Scope>
                              <td>
                                <Input
                                  name="arrive_for_lunch"
                                  dark={false}
                                  type="checkbox"
                                  value="true"
                                  disabled
                                />
                              </td>
                            </tr>
                          </Scope>
                        )}
                      </tbody>
                    </table>
                  </Scope>
                </div>

                <div className="row" style={{ marginTop: 20 }}>
                  <Button type="submit" loading={loading} disabled={loading}>
                    Inscrever-se
                  </Button>
                </div>
              </Form>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Subscribe;
