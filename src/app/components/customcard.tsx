import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";

interface iCustomCard {
  title: string
  description?: string
  href: string
  btnText: string
}

export default function CustomCard(props: iCustomCard) {
  return (
    <NextUIProvider>
      <Card className="m-8 w-full h-full flex flex-col justify-between">
        <CardHeader className="pt-2 px-4 pb-0 flex-col items-center">
          <h4 className="font-bold text-large">{props.title}</h4>
          <p className="text-default-500">{props.description}</p>
        </CardHeader>
        <CardBody className="flex p-0 justify-center items-center">
          <Button as={Link} href={props.href} className="bg-red">
            <p>{props.btnText}</p>
          </Button>
        </CardBody>
      </Card>
    </NextUIProvider>
  );
}
