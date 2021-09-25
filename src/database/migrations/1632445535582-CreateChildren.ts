import {
  QueryRunner,
  MigrationInterface,
  Table,
  TableForeignKey
} from 'typeorm'

export default class CreateChildren1632445535582 implements MigrationInterface {
  name = 'CreateChildren1632445535582'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'childrens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'parent_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false
          },
          {
            name: 'vaccinated',
            type: 'boolean',
            isNullable: false,
            default: false
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

    await queryRunner.createForeignKey(
      'childrens',
      new TableForeignKey({
        name: 'Parent',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'parents',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('childrens')
  }
}
