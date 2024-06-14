"use client";

import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/card";
import { iPortalCard } from "@/app/interfaces/card";
import { handleRedirect } from './utils';

export default function PortalCard(props: iPortalCard) {

  const onRedirect = () => handleRedirect(props.href, props.port);

  return (
    <NextUIProvider className="w-96">
      <Card className="m-4">
        <CardBody>
          <Button onClick={onRedirect}>
            <p>{props.btnText}</p>
          </Button>
        </CardBody>
      </Card>
    </NextUIProvider>
  );
}
