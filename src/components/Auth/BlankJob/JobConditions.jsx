import React from "react";

export default function JobConditions() {
  return (
    <div>
      <div>
        <h3>Condiciones</h3>
        <Form.Item name="salary">
          <Input placeholder="Salario bruto anual" />
        </Form.Item>
        <Form.Item name="variable">
          <Input placeholder="Variable" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Beneficio social" />
        </Form.Item>
        <Button>Añadir Beneficio</Button>
        <div>
          <ul>
            <li>Beneficio 1</li> <li>Beneficio 2</li> <li>Beneficio 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
