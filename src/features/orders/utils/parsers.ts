import { createSerializer, parseAsInteger } from 'nuqs'

export const parsers = {
  page: parseAsInteger.withDefault(1),
}

export const serializeSearchParams = createSerializer(parsers)
