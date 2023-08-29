import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Head from "next/head";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import * as Yup from "yup";

import { FormHandles, SubmitHandler } from "@unform/core";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { Input, InputMask, InputSelect } from "../../components/Inputs";

import { getValidationErrors } from "../../utils/getValidationErrors";
import {
  Color,
  ContainerValues,
  FileContainer,
} from "../../styles/pages/subscribe";
import { ShowValue } from "../../components/ShowValue";
import { Upload } from "../../components/Upload";

interface SubscribeFormData {
  cla_name: string;
  scout_group: {
    name: string;
    number: string;
    city: string;
    state: string;
    district_name: string;
  };
  payment: {
    pix_key: string;
    bank: string;
    agency: string;
    account: string;
    holder: {
      name: string;
      document: string;
    };
  };
  responsable: {
    name: string;
    email: string;
    phone: string;
  };
  receipt_file: string;
  members: {
    name: string;
    sex: string;
    register: string;
    restrictions: {
      alimentation: string;
      health: string;
    };
    type: string;
    arrive_for_lunch: boolean;
  }[];
  staff: {
    name: string;
    sex: string;
    register: string;
    function: string;
    can_assist_in: string;
    restrictions: {
      alimentation: string;
      health: string;
    };
    arrive_for_lunch: boolean;
  }[];
  drivers: {
    name: string;
    restrictions: {
      alimentation: string;
      health: string;
    };
    arrive_for_lunch: boolean;
  }[];
}

const vMEMBER = 100;
const vSTAFF = 100;
const vDRIVER = 90;

const inDev = process.env.NODE_ENV === "development" ? true : undefined;

const initData = inDev && {
  cla_name: "Clã Desbravador",
  scout_group: {
    name: "GE Xapecó",
    number: "86",
    city: "Chapecó",
    state: "SC",
    district_name: "Oeste",
  },

  payment: {
    pix_key: "10494923903",
    bank: "001",
    agency: "001",
    account: "0000001",
    holder: {
      name: "André Ghisleni Raimann",
      document: "104.949.239-03",
    },
  },

  responsable: {
    name: "André Ghisleni Raimann",
    email: "andre@andreg.com.br",
    phone: "(49) 9 9938-3783",
  },
};

const Subscribe: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isUploadStarted, setIsUploadStarted] = useState(false);
  const [numMembers, setNumMembers] = useState<number>(0);
  const [numStaffs, setNumStaffs] = useState<number>(0);
  const [numDrivers, setNumDrivers] = useState<number>(0);

  const [localFile, setLocalFile] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const uploadFile = useCallback(async () => {
    if (localFile) {
      const data = new FormData();
      data.append("file", localFile);
      try {
        setIsUploadStarted(true);
        const response = await api.post("/inscriptions/subscribe/upload", data);

        setFileName(response.data.file);

        setIsFileUploaded(true);
      } catch (err) {
        toast.error("Erro ao fazer upload do arquivo");
      }
    }
  }, [localFile]);

  const handleUpload = useCallback((f: File[]) => {
    setLocalFile(f[0]);
    setFileUrl(URL.createObjectURL(f[0]));
  }, []);

  const handleRemoveFile = useCallback(() => {
    setLocalFile(null);
    setFileUrl(null);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      localFile && uploadFile();
    }, 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, [localFile, uploadFile]);

  const handleSubmit: SubmitHandler<SubscribeFormData> = useCallback(
    async (data): Promise<void> => {
      try {
        console.log(data);
        const schema = Yup.object().shape({
          cla_name: Yup.string().required("Nome da CLã é obrigatório"),
          scout_group: Yup.object().shape({
            name: Yup.string().required(
              "Nome do Grupo Escoteiro é obrigatório"
            ),
            number: Yup.string().required(
              "Numeral do Grupo Escoteiro é obrigatório"
            ),
            city: Yup.string().required(
              "Cidade do Grupo Escoteiro é obrigatório"
            ),
            state: Yup.string().required(
              "Estado do Grupo Escoteiro é obrigatório"
            ),
            district_name: Yup.string().required(
              "Distrito do Grupo Escoteiro é obrigatório"
            ),
          }),
          payment: Yup.object().shape({
            pix_key: Yup.string().required("Chave PIX é obrigatório"),
            bank: Yup.string().required("Banco é obrigatório"),
            agency: Yup.string().required("Agência é obrigatório"),
            account: Yup.string().required("Conta é obrigatório"),
            holder: Yup.object().shape({
              name: Yup.string().required("Nome do titular é obrigatório"),
              document: Yup.string().required("CPF do titular é obrigatório"),
            }),
          }),
          responsable: Yup.object().shape({
            name: Yup.string().required("Nome do responsável é obrigatório"),
            email: Yup.string()
              .required("E-mail do responsável é obrigatório")
              .email("Digite um e-mail válido"),
            phone: Yup.string().required(
              "Telefone do responsável é obrigatório"
            ),
          }),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        if (numMembers === 0 && numStaffs === 0) {
          toast(
            "Você precisa ter pelo menos um participante, como mestre ou pioneiro",
            {
              type: "error",
            }
          );
          return;
        }

        const formData = {
          ...data,
          receipt_file: fileName,
          members: numMembers === 0 ? [] : data.members,
          staff: numStaffs === 0 ? [] : data.staff,
          drivers: numDrivers === 0 ? [] : data.drivers,
        };

        setLoading(true);
        await api.post("/inscriptions/subscribe", formData);

        formRef.current?.reset();
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        } else {
          // console.log(err);
          toast("Erro na inscrição, tente novamente mais tarde", {
            type: "error",
          });
        }

        setLoading(false);
      }
    },
    [setLoading, setSuccess, fileName, numStaffs, numDrivers, numMembers]
  );

  const handleClickSetMembers = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_j");

    if (!n) setNumMembers(0);

    setNumMembers(n);
  }, []);
  const handleClickSetStaffs = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_s");

    if (!n) setNumStaffs(0);

    setNumStaffs(n);
  }, []);

  const handleClickSetDrivers = useCallback(() => {
    const n = formRef.current?.getFieldValue("n_d");

    if (!n) setNumDrivers(0);

    setNumDrivers(n);
  }, []);

  const nunsMembers = useMemo(() => {
    const nuns = [];

    if (numMembers > 0) {
      for (let i = 0; i < numMembers; i++) {
        nuns.push(i);
      }
    }

    return nuns;
  }, [numMembers]);

  const nunsStaffs = useMemo(() => {
    const nuns = [];

    if (numStaffs > 0) {
      for (let i = 0; i < numStaffs; i++) {
        nuns.push(i);
      }
    }

    return nuns;
  }, [numStaffs]);

  const nunsDrivers = useMemo(() => {
    const nuns = [];

    if (numDrivers > 0) {
      for (let i = 0; i < numDrivers; i++) {
        nuns.push(i);
      }
    }

    return nuns;
  }, [numDrivers]);

  const valueMembers = useMemo(() => {
    return numMembers * vMEMBER;
  }, [numMembers]);

  const valueStaffs = useMemo(() => {
    return numStaffs * vSTAFF;
  }, [numStaffs]);

  const valueDrivers = useMemo(() => {
    return numDrivers * vDRIVER;
  }, [numDrivers]);

  const valueTotal = useMemo(() => {
    return valueMembers + valueStaffs + valueDrivers;
  }, [valueMembers, valueStaffs, valueDrivers]);

  return (
    <>
      <Head>
        <title>Inscrições | INTERCLÃS Form</title>
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
                  <Color>Formulário de inscrição para o INTERCLÃS</Color>
                </h1>
              </div>
              <Form
                onSubmit={handleSubmit}
                ref={formRef}
                initialData={initData || {}}
              >
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
                    <Color>Dados bancários para reembolsos:</Color>
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
                      label="Banco"
                      placeholder="Distrito"
                      required
                    />
                    <Input
                      name="agency"
                      dark={false}
                      label="Agência"
                      placeholder="Distrito"
                      required
                    />
                    <Input
                      name="account"
                      dark={false}
                      label="Conta"
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
                    <Color>Dados do responsável pelo clã:</Color>
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
                  <Color>INVESTIMENTO INDIVIDUAL: R$ 100,00</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_j"
                    dark={false}
                    label="Número de jovens (pioneiros e seniores)"
                    type="number"
                    placeholder="0"
                    min={0}
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
                        {nunsMembers.map((i) => (
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
                        {nunsMembers.length === 0 && (
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
                  <Color>INVESTIMENTO INDIVIDUAL: R$ 100,00</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_s"
                    dark={false}
                    label="Número de Mestres / Assistentes / Diretores"
                    type="number"
                    placeholder="0"
                    min={0}
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
                        {nunsStaffs.map((i) => (
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
                        {nunsStaffs.length === 0 && (
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
                  <Color>DESPESA: R$ 90,00 - Somente Alimentação</Color>
                </h2>
                <div className="row" style={{ marginTop: 20 }}>
                  <Input
                    name="n_d"
                    dark={false}
                    label="Número de motoristas"
                    type="number"
                    placeholder="0"
                    min={0}
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
                        {nunsDrivers.map((i) => (
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
                        {nunsDrivers.length === 0 && (
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

                <ContainerValues>
                  <h1>Valores por cada grupo de pessoas:</h1>
                  <ShowValue
                    value={valueMembers}
                    label="Seniores e pioneiros"
                  />
                  <ShowValue
                    value={valueStaffs}
                    label="Mestres, assistentes e diretores"
                  />
                  <ShowValue value={valueDrivers} label="Motoristas" />
                  <ShowValue value={valueTotal} label="Valor total" total />
                </ContainerValues>

                <div className="row">
                  <h2>
                    Antes de realizar a inscrição, faça o pagamento e anexe o
                    comprovante no campo abaixo.
                  </h2>
                </div>
                <FileContainer>
                  {localFile ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveFile();
                        }}
                        disabled={isUploadStarted || isFileUploaded}
                      >
                        <IoMdClose />
                      </button>
                      {localFile.type === "application/pdf" ? (
                        <iframe
                          src={fileUrl || ""}
                          frameBorder="0"
                          title={fileUrl || ""}
                        />
                      ) : (
                        <img src={fileUrl || ""} alt="" />
                      )}

                      {isUploadStarted && !isFileUploaded && (
                        <h2>
                          <Color>Carregando arquivo...</Color>
                        </h2>
                      )}
                      {isFileUploaded && (
                        <h2>
                          <Color>Arquivo carregado com sucesso!</Color>
                        </h2>
                      )}
                    </>
                  ) : (
                    <Upload onUpload={handleUpload} />
                  )}
                </FileContainer>

                <div className="row" style={{ marginTop: 20 }}>
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading || !isFileUploaded}
                  >
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
