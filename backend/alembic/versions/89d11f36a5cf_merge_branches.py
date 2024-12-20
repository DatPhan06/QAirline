"""Merge branches

Revision ID: 89d11f36a5cf
Revises: 1a8023f47dc2
Create Date: 2024-12-20 01:21:00.388266

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '89d11f36a5cf'
down_revision: Union[str, None] = '1a8023f47dc2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
