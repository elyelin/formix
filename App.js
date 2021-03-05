import React from "react";
import { Formik, useFormikContext, useField } from "formik";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Yup from "yup";

const MyInput = ({ fieldName, ...props }) => {
  const [field, meta] = useField(fieldName);
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={field.onChange("fieldName")}
        onBlur={field.onBlur(fieldName)}
        value={field.value}
        {...props}
      />
      {meta.error && meta.touched && (
        <Text style={{ color: "red" }}>{meta.error}</Text>
      )}
    </>
  );
};

const EmailForm = () => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <Text>Correo electrónico</Text>
      <MyInput fieldName="email" />
      <MyInput fieldName="name" />
      <Button onPress={submitForm} title="Enviar" />
    </>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={(x) => console.log(x)}
        validationSchema={Yup.object({
          email: Yup.string().email("Correo inválido").required("Requerido"),
          name: Yup.string().min(10).required("Requerido"),
        })}
        initialValues={{ email: "", name: "" }}
      >
        <EmailForm />
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 30,
    width: 140,
    backgroundColor: "#eee",
  },
});
