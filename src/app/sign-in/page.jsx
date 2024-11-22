"use client";
import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import Form from "@/components/form/form";
import InputContainer from "@/components/form/inputContainer";
import Input from "@/components/form/inputTypes/input";
import Label from "@/components/form/label";
import Logo from "@/components/logo";
import useSignIn from "./useSignIn";
import ErrorAlert from "@/components/errorAlert";
import LoadingBox from "@/components/loading";
import I18N from "@/i18n";
import { Suspense } from "react";

const mockData = {
  username: "rosina_demo",
  password: "demo123",
};

const SignInContent = () => {
  const { validations, onSubmit, loading, error } = useSignIn();
  return (
    <Container className="py-5">
      <Card>
        <Logo className="w-full  rounded-tl-xl rounded-tr-xl overflow-hidden border-b-2 border-primary/40" />

        <div className="px-9 py-6">
          <div className="relative">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-400">
              <I18N id="sign.title" />
            </h1>
            <p className="text-center mb-5 text-sm text-balance text-gray-600">
              <I18N id="sign.description" />
            </p>

            <Form validations={validations} onSubmit={onSubmit}>
              <InputContainer validate="username">
                <Label text="form.username" name="username" required />
                <Input
                  name="username"
                  placeholder="form.username.placeholder"
                  autocomplete="username"
                  ariaLabel="form.username"
                  icon="user"
                  data={mockData}
                />
              </InputContainer>
              <InputContainer validate="password">
                <Label text="form.password" name="password" required />
                <Input
                  name="password"
                  type="password"
                  placeholder="********"
                  noTranslatePlaceholder
                  autocomplete="password"
                  ariaLabel="form.password"
                  icon="password"
                  data={mockData}
                />
              </InputContainer>
              <ErrorAlert error={error ? "error.Login" : null} />
              <div className="text-center py-3">
                <Button size="lg">Entrar</Button>
              </div>
            </Form>
            <LoadingBox loading={loading} />
          </div>
        </div>
      </Card>
    </Container>
  );
};

const SignInPage = () => {
  return (
    <Suspense fallback={<LoadingBox loading={true} />}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
