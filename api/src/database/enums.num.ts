
import { registerEnumType } from '@nestjs/graphql';

export enum StatusEntity {
  ACTIVE = "Activo",
  INACTIVE = "Inactivo"
}

registerEnumType(StatusEntity, {
  name: 'StatusEntity',
  description: 'Posibles estados de las entidades',
});

export enum DocumentTypeEnum {
  CC = 'Cédula de Ciudadania',
  CE = 'Cédula de Extranjeria',
  P = 'Pasaporte',
  PEP = 'Permiso de Permanencia',
  NIT = 'NIT',
}

registerEnumType(DocumentTypeEnum, {
  name: 'DocumentTypeEnum',
  description: 'Tipos de documentos permitidos',
});


