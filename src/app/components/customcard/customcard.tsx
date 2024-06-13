import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { iCustomCard } from "@/app/interfaces/card";

export default function CustomCard(props: iCustomCard) {
  return (
    <NextUIProvider>
      <Card className="m-6 w-full h-full flex flex-col justify-between">
        <CardHeader className="pb-4 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large">{props.title}</h4>
          <p className="text-default-500">{props.description}</p>
        </CardHeader>
        <CardBody className="flex justify-center items-center">
          <Button as={Link} href={props.href} className="btn bg-beige shadow min-w-[150px]" onClick={props.onClick}>
            <p>{props.btnText}</p>
          </Button>
        </CardBody>
      </Card>
    </NextUIProvider>
  );
}
