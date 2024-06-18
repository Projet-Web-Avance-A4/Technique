"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { iPortalCard } from "@/app/interfaces/card";
import { handleRedirect } from './utils';

export default function PortalCard(props: iPortalCard) {

  const onRedirect = () => handleRedirect(props.href, props.port);

  return (
    <Card className="m-4">
      <CardBody>
        <Button onClick={onRedirect}>
          <p>{props.btnText}</p>
        </Button>
      </CardBody>
    </Card>
  );
}
