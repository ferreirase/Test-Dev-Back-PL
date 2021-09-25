import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateParents1632349319181 implements MigrationInterface {
  name = 'CreateParents1632349319181'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'pedigree',
            type: 'boolean',
            isNullable: false,
            default: false
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parents')
  }
}
