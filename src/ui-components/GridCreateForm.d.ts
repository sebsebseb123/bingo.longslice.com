/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GridCreateFormInputValues = {
    shots?: string[];
    ships?: string[];
};
export declare type GridCreateFormValidationValues = {
    shots?: ValidationFunction<string>;
    ships?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GridCreateFormOverridesProps = {
    GridCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    shots?: PrimitiveOverrideProps<TextFieldProps>;
    ships?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GridCreateFormProps = React.PropsWithChildren<{
    overrides?: GridCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GridCreateFormInputValues) => GridCreateFormInputValues;
    onSuccess?: (fields: GridCreateFormInputValues) => void;
    onError?: (fields: GridCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GridCreateFormInputValues) => GridCreateFormInputValues;
    onValidate?: GridCreateFormValidationValues;
} & React.CSSProperties>;
export default function GridCreateForm(props: GridCreateFormProps): React.ReactElement;
