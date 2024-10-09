"use client";

import { getZipcode } from "@/app/clients/viacep.client";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import useForm, { FormState } from "@/hooks/use-form/use-form";
import { useCallback, useRef } from "react";

const AddressForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const initialLoginForm = {
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  };
  const {
    data: {
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount,
  } = useForm(formRef, initialLoginForm, submitCallback, submitErrorCallback);

  async function submitErrorCallback(error: Error) {
    // Verificar se o erro contém causas
    if (error.cause && Object.keys(error.cause).length) {
      // Mostrar mensagem de erro para cada causa
      let message = "Erro ao salvar endereço :\n\n";
      for (const key in error.cause) {
        // Adicionar causa ao texto da mensagem
        const causes = error.cause as { [key: string]: string };
        message += `- ${causes[key]}\n`;
      }
      // Exibir mensagem de erro
      return window.alert(message);
    }

    // Exibir mensagem de erro quando não houver causas
    return window.alert(error.message);
  }

  async function submitCallback(values: FormState) {
    try {
      // Enviar requisição para a API
      const request = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // Ler a resposta da API
      const response = await request.json();

      // Verificar se a resposta contém um token
      if (!response.token) {
        throw new Error(response.message);
      }

      window.alert("Endereço salvo com sucesso!");
    } catch (error) {
      // Tratar erro
      if (error instanceof Error) {
        return submitErrorCallback(error);
      }
      return submitErrorCallback(new Error("Erro ao salvar endereço"));
    }
  }

  const onZipCodeChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        handleChange(e);

        const response = await getZipcode(e.target.value);

        if (!response) {
          return;
        }

        handleChange({
          target: { name: "street", value: response.logradouro },
        } as React.ChangeEvent<HTMLInputElement>);
      } catch (error) {
        console.error(error);
      }
    },
    [handleChange]
  );

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label="CEP"
        type="text"
        name="zipcode"
        id="zipcode"
        placeholder="xxxxx-xxx"
        value={zipcode}
        handleChange={(_, e) => onZipCodeChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Rua"
        type="text"
        name="street"
        id="street"
        placeholder="Rua"
        value={street}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Número"
        type="text"
        name="number"
        id="number"
        placeholder="Número"
        value={number}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Complemento"
        type="text"
        name="complement"
        id="complement"
        placeholder="Complemento"
        value={complement}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
      />
      <Input
        label="Bairro"
        type="text"
        name="neighborhood"
        id="neighborhood"
        placeholder="Bairro"
        value={neighborhood}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Cidade"
        type="text"
        name="city"
        id="city"
        placeholder="Cidade"
        value={city}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="Estado"
        type="text"
        name="state"
        id="state"
        placeholder="Estado"
        value={state}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label="País"
        type="text"
        name="country"
        id="country"
        placeholder="País"
        value={country}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Button
        type="submit"
        disabled={loadingSubmit || !!errorsCount || !formRef.current}
      >
        {loadingSubmit ? "Carregando..." : "Salvar"}
      </Button>
    </form>
  );
};

export default AddressForm;
