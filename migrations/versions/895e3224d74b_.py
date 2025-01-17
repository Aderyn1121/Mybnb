"""empty message

Revision ID: 895e3224d74b
Revises: 
Create Date: 2021-11-17 16:43:34.698669

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '895e3224d74b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=250), nullable=False),
    sa.Column('city', sa.String(length=250), nullable=False),
    sa.Column('state', sa.String(length=250), nullable=False),
    sa.Column('country', sa.String(length=250), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('startDate', sa.DateTime(timezone=True), nullable=True),
    sa.Column('endDate', sa.DateTime(timezone=True), nullable=True),
    sa.Column('createdAt', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('locationId', sa.Integer(), nullable=False),
    sa.Column('startDate', sa.DateTime(), nullable=False),
    sa.Column('endDate', sa.DateTime(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['locationId'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('locationId', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=500), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['locationId'], ['locations.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('locationId', sa.Integer(), nullable=False),
    sa.Column('reviewId', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['locationId'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['reviewId'], ['reviews.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('images')
    op.drop_table('reviews')
    op.drop_table('bookings')
    op.drop_table('locations')
    op.drop_table('users')
    # ### end Alembic commands ###
