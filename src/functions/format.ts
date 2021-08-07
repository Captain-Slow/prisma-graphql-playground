import { normalize, schema } from 'normalizr';

export async function normaliseData(data) {
  if (data.length > 0) {
    const schema_ = new schema.Entity('normalisedData');
    const schemaList = [schema_];

    const { entities } = await normalize(data, schemaList);

    return entities.normalisedData;
  } else {
    return {};
  }
}
