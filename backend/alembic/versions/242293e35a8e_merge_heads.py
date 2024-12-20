"""Merge heads

Revision ID: 242293e35a8e
Revises: 01cd34365d8c, 4f7a38f8239a
Create Date: 2024-12-20 09:15:14.865426

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '242293e35a8e'
down_revision: Union[str, None] = ('01cd34365d8c', '4f7a38f8239a')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
