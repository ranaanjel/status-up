"use client"

import { fillForm } from "@/app/actions";
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect} from "react";
import { Spinner } from "./ui/spinner";


export function FormFill({type}:{type:string}) {

    let navigate = useRouter();

    const initialState =  { type, token: "", success:false };
    let [formdata, actions, isPending] = useActionState(fillForm, initialState);

    useEffect(function () {
        console.log(formdata)

        if(formdata.success && formdata.token) {
            localStorage.setItem("token", formdata.token)
            navigate.push("/dashboard")
        }

        if(formdata.success && type == "signup") {
            navigate.push("/signin")
        }
 
    },[formdata])
    
  return (
    <div >
      <form action={actions} className="w-1/2 m-auto">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{type=="signin" ? "Sign in" :"Sign up"}</FieldLegend>
            <FieldDescription>
              {type=="signin" ? "Make sure to use the strong password" :"Make sure you are using the correct username"}
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="user">
                 Username
                </FieldLabel>
                <Input
                    autoComplete="off"
                type="text"
                  id="user"
                  placeholder="John Doe"
                  required 
                  name="user"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  name="email"
                  type="text"
                  autoComplete="off"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  required
                />
                <FieldDescription>
                    Make sure email id is valid.
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="pass">
                    Enter Password
                  </FieldLabel>
                  <Input id="pass" name="pass" type="password" placeholder="" required />
                </Field>
                {/* <Field>
                  <FieldLabel htmlFor="conf">
                    Confirm Password
                  </FieldLabel>
                  <Input id="conf" type="password" placeholder="" required />
                </Field> */}
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit"> {isPending && <Spinner></Spinner> } {isPending ? " Working in progress ...":"Submit"}</Button>
            <Button onClick={()=> {
                if(type == "signin") {
                    navigate.push("/signup")
                }else {
                    navigate.push("/signin")
                }
            }} variant="outline" type="button">
              {type=="signin" ? "Signup Instead ": "Signin Instead"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
