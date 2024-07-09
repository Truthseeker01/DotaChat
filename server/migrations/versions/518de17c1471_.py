"""empty message

Revision ID: 518de17c1471
Revises: 2ebd05f18ea1
Create Date: 2024-07-09 11:14:07.968538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '518de17c1471'
down_revision = '2ebd05f18ea1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('reaction', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_column('reaction')

    # ### end Alembic commands ###