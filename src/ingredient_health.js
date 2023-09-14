const plant_ingredient_health = {
  scitific_name: null,
  common_name: {
    th: null,
    en: null
  },
  part_of_studied: null,
  process: null,
  condition: null,
  function_ingredient: []
}

const plant = {
  common_name: {
    th: null,
    en: null
  },
  scitific_name: null,
  source: []
}

const ingredient = {
  id: null,
  function_ingredient: {
    th: null,
    en: null
  },
  group: null,
  health_benefit: []
}

const health_benefit = {
  id: null,
  benefit: null,
  active_ingredient_point: [{ id: null, type: 'enum' }],
  reference: []
}

const health_system = {
  id: null,
  health_system: null,
  description: null
}

const disease = {
  id: null,
  disease: null,
  description: null
}