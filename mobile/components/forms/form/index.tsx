import React, {ReactNode} from 'react';
import {Formik, FormikConfig, FormikProps, FormikValues} from 'formik';

export interface FormContainerI<T extends FormikValues = FormikValues>
  extends FormikConfig<T> {
  children: (props: FormikProps<T>) => ReactNode;
  className?: string;
}

const Form = <T extends FormikValues = FormikValues>({
  children,
  ...props
}: FormContainerI<T>) => {
  return (
    <Formik {...props}>{formikProps => <>{children(formikProps)}</>}</Formik>
  );
};

export default Form;
