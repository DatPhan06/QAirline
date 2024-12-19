"""Merge branches

Revision ID: 1a8023f47dc2
Revises: 01cd34365d8c, 4f7a38f8239a
Create Date: 2024-12-20 01:12:33.595735

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1a8023f47dc2'
down_revision: Union[str, None] = ('01cd34365d8c', '4f7a38f8239a')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
